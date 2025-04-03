"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="px-6 py-6">
        <CardTitle className="text-center text-2xl font-bold">TODO List</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="flex gap-8">
          <Input
            placeholder="Enter a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo()
              }
            }}
            className="flex-1"
          />
          <Button onClick={addTodo} className="px-6" style={{ marginLeft: '24px' }}>
            Add
          </Button>
        </div>

        <div style={{ marginTop: '16px' }} className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground">No tasks</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center p-3 rounded-md border"
              >
                <span className="flex-1">{todo.text}</span>
                <Button 
                  variant="ghost" 
                  onClick={() => deleteTodo(todo.id)} 
                  className="h-8 px-3"
                  style={{ marginLeft: '24px' }}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const addTodo = () => {
    if (newTodo.trim() === "") return

    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  useEffect(() => {
    const button = addButtonRef.current;
    if (button) {
      const handleClick = () => {
        addTodo();
      };

      button.addEventListener('click', handleClick, { passive: false });
      button.addEventListener('touchstart', handleClick, { passive: false });

      return () => {
        button.removeEventListener('click', handleClick);
        button.removeEventListener('touchstart', handleClick);
      };
    }
  }, [addTodo]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">TODOリスト</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="新しいタスクを入力"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo()
              }
            }}
          />
          <Button ref={addButtonRef}>
            <PlusCircle className="h-4 w-4 mr-2" />
            追加
          </Button>
        </div>

        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-muted-foreground">タスクがありません</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-md border ${
                  todo.completed ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    id={`todo-${todo.id}`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)} aria-label="タスクを削除">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}


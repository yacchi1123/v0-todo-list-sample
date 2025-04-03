import TodoList from "@/components/todo-list"

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="w-[90%] max-w-md">
        <TodoList />
      </div>
    </div>
  )
}


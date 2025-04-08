"use client"

import { useState } from "react"
import TabNavigation from "./components/tab-navigation"
import FontUploader from "./components/font-uploader"
import FontList from "./components/font-list"
import FontGroupForm from "./components/font-group-form"
import FontGroupList from "./components/form-group-list"
import { FiUpload, FiList, FiPlus, FiGrid } from "react-icons/fi"

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload")

  const tabs = [
    { id: "upload", label: "Upload Font", icon: <FiUpload className="mr-2" /> },
    { id: "fonts", label: "Font List", icon: <FiList className="mr-2" /> },
    { id: "create-group", label: "Create Font Group", icon: <FiPlus className="mr-2" /> },
    { id: "groups", label: "Font Groups", icon: <FiGrid className="mr-2" /> },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Font Group System</h1>

        <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="mt-8">
          {activeTab === "upload" && <FontUploader />}
          {activeTab === "fonts" && <FontList />}
          {activeTab === "create-group" && <FontGroupForm />}
          {activeTab === "groups" && <FontGroupList />}
        </div>
      </div>
    </main>
  )
}

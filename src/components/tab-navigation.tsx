"use client"

import type React from "react"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export default function TabNavigation({ tabs, activeTab, onChange }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap border-b border-gray-200">
      {tabs.map((tab) => {
        // Base styles for all tabs
        const baseStyles = "flex items-center py-3 px-4 text-sm font-medium border-b-2 transition-colors"

        // Conditional styles based on active state
        const activeStyles =
          activeTab === tab.id
            ? "border-gray-800 text-gray-800"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"

        // Combine all styles
        const tabStyles = `${baseStyles} ${activeStyles}`

        return (
          <button key={tab.id} className={tabStyles} onClick={() => onChange(tab.id)}>
            {tab.icon}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

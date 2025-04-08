"use client"

import * as React from "react"

// Tabs Context
type TabsContextType = {
  selectedTab: string
  setSelectedTab: (id: string) => void
}

const TabsContext = React.createContext<TabsContextType>({
  selectedTab: "",
  setSelectedTab: () => {},
})

// Tabs Root
interface TabsProps {
  children: React.ReactNode
  defaultValue: string
  className?: string
  onChange?: (value: string) => void
}

export function Tabs({ children, defaultValue, className = "", onChange }: TabsProps) {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue)

  const handleTabChange = (value: string) => {
    setSelectedTab(value)
    if (onChange) onChange(value)
  }

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

// Tabs List
interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex border-b border-gray-200 ${className}`}>{children}</div>
}

// Tab Trigger
interface TabTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
}

export function TabTrigger({ children, value, className = "" }: TabTriggerProps) {
  const { selectedTab, setSelectedTab } = React.useContext(TabsContext)
  const isSelected = selectedTab === value

  const baseStyles = "py-3 px-4 text-sm font-medium border-b-2 transition-colors"
  const selectedStyles = isSelected
    ? "border-gray-800 text-gray-800"
    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"

  return (
    <button
      className={`${baseStyles} ${selectedStyles} ${className}`}
      onClick={() => setSelectedTab(value)}
      role="tab"
      aria-selected={isSelected}
    >
      {children}
    </button>
  )
}

// Tab Content
interface TabContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

export function TabContent({ children, value, className = "" }: TabContentProps) {
  const { selectedTab } = React.useContext(TabsContext)

  if (selectedTab !== value) return null

  return (
    <div className={`mt-4 ${className}`} role="tabpanel">
      {children}
    </div>
  )
}

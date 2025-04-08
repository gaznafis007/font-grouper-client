import axios from "axios"

// Create axios instance with default config
const api = axios.create({
  baseURL: "/api", // Assuming your API is served from the same domain
  headers: {
    "Content-Type": "application/json",
  },
})

// Font API
export const uploadFont = async (formData: FormData, onProgress?: (progress: number) => void) => {
  const response = await api.post("/fonts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total && onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    },
  })
  return response.data
}

export const getFonts = async () => {
  // Mock data for development
  // In a real app, this would be: const response = await api.get("/fonts");
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  return [
    {
      id: "1",
      name: "Open Sans",
      url: "https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2",
      uploadDate: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Roboto",
      url: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2",
      uploadDate: "2023-05-16T14:20:00Z",
    },
    {
      id: "3",
      name: "Lato",
      url: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2",
      uploadDate: "2023-05-17T09:15:00Z",
    },
  ]
}

// Font Group API
interface FontGroupData {
  name: string;
  fonts: { id: string; name: string }[];
}

export const createFontGroup = async (data: FontGroupData) => {
  // In a real app: const response = await api.post("/font-groups", data);
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return { id: Date.now().toString(), ...data }
}

export const getFontGroups = async () => {
  // Mock data for development
  // In a real app: const response = await api.get("/font-groups");
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  return [
    {
      id: "1",
      name: "Heading Fonts",
      fonts: [
        { id: "1", name: "Open Sans" },
        { id: "2", name: "Roboto" },
      ],
    },
    {
      id: "2",
      name: "Body Text Fonts",
      fonts: [
        { id: "2", name: "Roboto" },
        { id: "3", name: "Lato" },
      ],
    },
  ]
}

export const updateFontGroup = async (id: string, data: FontGroupData) => {
  // In a real app: const response = await api.put(`/font-groups/${id}`, data);
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return { id, ...data }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteFontGroup = async (id: string) => {
  // In a real app: const response = await api.delete(`/font-groups/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  return { success: true }
}

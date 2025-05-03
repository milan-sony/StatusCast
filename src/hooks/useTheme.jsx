import { useEffect, useState } from 'react'

const useTheme = () => {
    // Cache theme from localStorage
    const storedTheme = localStorage.getItem('theme')
    const [theme, setTheme] = useState(storedTheme ? storedTheme : 'light')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return { theme, toggleTheme }
}

export default useTheme

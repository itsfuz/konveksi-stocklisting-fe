// src/app/login/page.tsx
"use client" // Add this to handle the client-side form logic

import { login } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { api } from "@/lib/api"


export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState<string>("");
    const [keyCode, setKeyCode] = useState<string>("");

    // Wrapper function to handle the return value correctly
    async function handleFormAction() {
        setError(null);
        const data = await api.post<boolean>("/api/v1/auth-api/check-auth", {
            username: username,
            keyCode: keyCode
        });

        if (data === false) {
            setError("Invalid Credentials!")
            return;
        }

        const result = await login(username);

        // If the server action returned an error object, show it in the UI
        if (result?.error) {
            setError(result.error)
        }
    }

    return (
        <div className="flex min-h-5/6 items-center justify-center">
            <Card className="w-full max-w-md border-none shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Konveksi System
                    </CardTitle>
                    <CardDescription>
                        Enter your name to access the Stock Listing Dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Use our wrapper function here */}
                    <form action={handleFormAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setKeyCode(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-sm font-medium text-destructive">{error}</p>
                        )}

                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
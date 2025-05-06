import { useState, useEffect } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { user, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  // Redirect if already logged in
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
              <h2 className="text-2xl font-poppins font-semibold">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="mt-1 opacity-90">
                {activeTab === "login"
                  ? "Login to your HeartDraw account"
                  : "Join HeartDraw and start creating"}
              </p>
            </div>
            <CardContent className="p-6">
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="login-username">Username</Label>
                        <Input
                          id="login-username"
                          placeholder="Enter your username"
                          {...loginForm.register("username")}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-xs text-destructive mt-1">
                            {loginForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          {...loginForm.register("password")}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-xs text-destructive mt-1">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Login
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="register-username">Username</Label>
                        <Input
                          id="register-username"
                          placeholder="Choose a username"
                          {...registerForm.register("username")}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-xs text-destructive mt-1">
                            {registerForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          {...registerForm.register("password")}
                        />
                        {registerForm.formState.errors.password && (
                          <p className="text-xs text-destructive mt-1">
                            {registerForm.formState.errors.password.message}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 6 characters long
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Create Account
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-800 mb-4">
              Create Beautiful Heart Drawings
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Express your creativity with our intuitive heart drawing tools. 
              Sign up to save and share your creations!
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-poppins font-semibold mb-2 text-primary">Why HeartDraw?</h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  <li>Easy to use drawing tools</li>
                  <li>Beautiful heart templates</li>
                  <li>Save and download your creations</li>
                  <li>Share with loved ones</li>
                  <li>Build your personal gallery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

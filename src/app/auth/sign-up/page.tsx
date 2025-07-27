import { SignUp } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Únete a CommunityOS</CardTitle>
            <CardDescription>
              Crea tu cuenta y comienza a gestionar tu comunidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
                  card: "shadow-none",
                  headerTitle: "text-black",
                  headerSubtitle: "text-gray-600",
                }
              }}
              redirectUrl="/dashboard"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
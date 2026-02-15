import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ProfilePage = () => {
  const { user, isCompany, isUser, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name ?? "");
    setCompanyName(user.companyName ?? "");
  }, [user]);

  if (!user) {
    return (
      <div className="text-sm text-slate-600">You need to be signed in to edit your profile.</div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      updateProfile({ name, companyName: isCompany ? companyName : undefined });
      setMessage("Profile updated.");
    } catch {
      setMessage("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-slate-900">Edit Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Update your basic information. Different fields are shown depending on your role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="space-y-1">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
            </div>

            {isCompany && (
              <div className="space-y-1">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
            )}

            {isUser && (
              <p className="text-xs text-slate-500">
                As a freelancer, you can keep your profile simple for now. Later you might add
                skills, headline, and portfolio links here.
              </p>
            )}

            {message && (
              <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
                {message}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

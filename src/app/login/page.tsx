import SectionLogin from "@/website/Section/SectionLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page || Ecommerce",
  description: "A fully functional ecommerce website.",
};

export default async function Login() {
  return (
    <div>
      <SectionLogin />
    </div>
  );
}

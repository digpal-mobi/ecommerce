import Button from "@/website/Components/Button";
import Increment from "@/website/Components/Increment";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-[20px]">
      <Button variant="primary" btnText="View All" />
      <Increment />
    </div>
  );
}

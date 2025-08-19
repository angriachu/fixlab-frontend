import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "RDP Tools",
    items: [
      { name: "AnyDesk", href: "#" },
      { name: "RustDesk", href: "#" },
      { name: "Chrome Remote Desktop", href: "#" },
    ],
  },
  {
    title: "Software",
    items: [
      { name: "7-Zip", href: "#" },
      { name: "VLC", href: "#" },
      { name: "Notepad++", href: "#" },
    ],
  },
  {
    title: "Operating Systems",
    items: [
      { name: "Ubuntu 24.04 ISO", href: "#" },
      { name: "Windows 11 Media Tool", href: "#" },
    ],
  },
];

export default function Downloads() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Downloads</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map(sec => (
          <Card key={sec.title} className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold">{sec.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {sec.items.map(x => (
                <li key={x.name} className="flex items-center justify-between">
                  <span>{x.name}</span>
                  <Button asChild size="sm" variant="outline"><a href={x.href} download>Download</a></Button>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}

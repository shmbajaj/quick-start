import { ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function TaskList({
  title,
  icon,
  data,
}: {
  title: string;
  icon: ReactNode;
  data: Array<{ title: string; description: string; status?: string }>;
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>
        {data.map((item, index) => (
          <div
            className="flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
            key={index}
          >
            {icon}
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{item.title}</p>
              <p className="text-sm text-muted-foreground flex space-x-2">
                {item.status && (
                  <Badge variant={"outline"}>{item.status}</Badge>
                )}
                <span>{item.description}</span>
              </p>
            </div>
          </div>
        ))}
      </CardDescription>
    </Card>
  );
}

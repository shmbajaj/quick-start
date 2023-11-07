import Search from "@/components/search";
import TaskList, { TaskListProps } from "@/components/task-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, CircleEllipsis, Filter } from "lucide-react";

const data: Record<"active" | "ongoing" | "done", TaskListProps> = {
  active: {
    title: "Active",
    icon: <Circle className="mt-px h-5 w-5" />,
    data: [
      {
        title: "JOB1",
        description: "Product to be installed for client A",
        status: "requested",
      },
      {
        title: "JOB2",
        description: "Product to be installed for client B",
        status: "approved",
      },
      {
        title: "JOB3",
        description: "Product to be installed for client C",
        status: "open",
      },
    ],
  },
  ongoing: {
    title: "Ongoing",
    icon: <CircleEllipsis className="mt-px h-5 w-5" />,
    data: [
      {
        title: "JOB1",
        description: "Product to be installed for client A",
      },
      {
        title: "JOB2",
        description: "Product to be installed for client B",
      },
      {
        title: "JOB3",
        description: "Product to be installed for client C",
      },
    ],
  },
  done: {
    title: "Done",
    icon: <CheckCircle className="mt-px h-5 w-5" />,
    data: [
      {
        title: "JOB1",
        description: "Product to be installed for client A",
      },
      {
        title: "JOB2",
        description: "Product to be installed for client B",
      },
      {
        title: "JOB3",
        description: "Product to be installed for client C",
      },
    ],
  },
};

export default function Tasks() {
  return (
    <div className="max-w-md m-auto grid gap-2">
      <div className="flex items-center space-x-4 rounded-xl p-6 border bg-card text-card-foreground shadow">
        <Avatar>
          <AvatarImage src="https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/avatars/02.png" />
          <AvatarFallback>Engineer</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">Shubham Bajaj</p>
          <p className="text-sm text-muted-foreground">m@example.com</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tasks List</CardTitle>
          <CardDescription>
            Discover, locate, and choose your preferred task.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center space-x-4">
            <Search />
            <Button size={"icon"}>
              <Filter />
            </Button>
          </div>
          <Tabs defaultValue="active" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="active">
                <div className="flex flex-col justify-center items-center space-y-1">
                  <div className="text-2xl font-bold">24</div>
                  <div>Active</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="ongoing">
                <div className="flex flex-col justify-center items-center space-y-1">
                  <div className="text-2xl font-bold">16</div>
                  <div>Ongoing</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="done">
                <div className="flex flex-col justify-center items-center space-y-1">
                  <div className="text-2xl font-bold">8</div>
                  <div>Done</div>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <TaskList {...data.active} />
            </TabsContent>
            <TabsContent value="ongoing">
              <TaskList {...data.ongoing} />
            </TabsContent>
            <TabsContent value="done">
              <TaskList {...data.done} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

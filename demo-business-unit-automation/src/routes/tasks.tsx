import Search from "@/components/search";
import TaskList from "@/components/task-list";
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
import { Filter } from "lucide-react";

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
              <TaskList title="Active" />
            </TabsContent>
            <TabsContent value="ongoing">
              <TaskList title="Ongoing" />
            </TabsContent>
            <TabsContent value="done">
              <TaskList title="Done" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

import type { BoardGame } from "@/content.config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Subtle } from "./ui/typography";

type BoardGameCardProps = {
  boardGame: BoardGame;
};

export const BoardGameCard = ({ boardGame }: BoardGameCardProps) => {
  return (
    <Card className="overflow-hidden p-0">
      <img
        src={boardGame.image ?? ""}
        alt="Card header image"
        className="w-full h-48 object-cover"
      />
      <CardHeader className="flex justify-between pt-3">
        <div>
          <CardTitle>
            {boardGame.name} ({boardGame.yearPublished})
          </CardTitle>
          <CardDescription>{boardGame.playingTime} minutes</CardDescription>
        </div>
        <Subtle>
          {boardGame.minPlayers} - {boardGame.maxPlayers} players
        </Subtle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Discover breathtaking landscapes, vibrant cities, and hidden gems that
          will inspire your next adventure.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

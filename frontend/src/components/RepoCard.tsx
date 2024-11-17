import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

interface RepoCardProps {
  heading: string;
  score?: string | number;
  content?: React.ReactNode;
}

const RepoCard: React.FC<RepoCardProps> = React.memo(({
  heading,
  score,
  content
}) => {
  return (
    <Card>
      <CardHeader title={heading} />
      <CardContent>
        <Typography variant="body2" color="textSecondary">{content}</Typography>
        {score && (
          <Typography variant="body1" color="primary">
            Score: {score} /100
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});

RepoCard.displayName = 'RepoCard';
export default RepoCard;

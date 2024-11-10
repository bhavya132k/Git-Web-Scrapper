import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

interface RepoCardProps {
  heading: string;
  score?: number;
  content?: React.ReactNode;
}

const RepoCard: React.FC<RepoCardProps> = ({
  heading,
  score,
  content,
}) => {
  return (
    <Card>
      <CardHeader
        title= {heading}
      />
      <CardContent >
        <Typography variant="body2" color="textSecondary">{content}</Typography>
        {score !== undefined ? (
          <Typography variant="body1" color="primary">
            Score: {score}
          </Typography>
        ) : (
          <Typography variant="body1" color="primary">
            N/A 
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RepoCard;

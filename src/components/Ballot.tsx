
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useVoting } from '@/context/VotingContext';

const Ballot: React.FC = () => {
  const { candidates, selectedCandidate, setSelectedCandidate, castVote } = useVoting();
  
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-background/50 backdrop-blur-lg border border-border/50">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
            Official Ballot
          </div>
          <h3 className="text-lg font-medium">Select Your Candidate</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose one candidate for each position
          </p>
        </div>
        
        <div className="mt-4 mb-6">
          <h4 className="text-md font-medium mb-2">President</h4>
          <RadioGroup value={selectedCandidate || ''} onValueChange={setSelectedCandidate} className="space-y-2">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center space-x-2 rounded-lg border border-muted p-3 transition-colors hover:bg-muted/50"
              >
                <RadioGroupItem 
                  value={candidate.id} 
                  id={`candidate-${candidate.id}`} 
                  className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
                />
                <Label 
                  htmlFor={`candidate-${candidate.id}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {candidate.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={castVote} 
            disabled={!selectedCandidate}
            className="relative overflow-hidden group"
          >
            <span className="relative z-10">Cast Vote</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Ballot;

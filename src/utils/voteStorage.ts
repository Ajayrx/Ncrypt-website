
// Simulated local storage for votes
// In a real system, this would use secure storage with encryption

interface Vote {
  candidateId: string;
  timestamp: number;
  signature?: string; // For cryptographic verification
}

class VoteStorage {
  private storageKey = 'nfc-vote-guardian-votes';
  
  // Get votes from local storage
  getVotes(): Vote[] {
    try {
      const storedVotes = localStorage.getItem(this.storageKey);
      return storedVotes ? JSON.parse(storedVotes) : [];
    } catch (error) {
      console.error('Error retrieving votes:', error);
      return [];
    }
  }
  
  // Save a vote to local storage
  saveVote(vote: Vote): boolean {
    try {
      const votes = this.getVotes();
      votes.push(vote);
      localStorage.setItem(this.storageKey, JSON.stringify(votes));
      return true;
    } catch (error) {
      console.error('Error saving vote:', error);
      return false;
    }
  }
  
  // Clear all votes (admin function)
  clearVotes(): boolean {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing votes:', error);
      return false;
    }
  }
  
  // Get vote count per candidate
  getResults(): Record<string, number> {
    const votes = this.getVotes();
    return votes.reduce((acc: Record<string, number>, vote) => {
      const { candidateId } = vote;
      acc[candidateId] = (acc[candidateId] || 0) + 1;
      return acc;
    }, {});
  }
  
  // Verify vote integrity (in a real system, this would use cryptographic verification)
  verifyVotes(): boolean {
    // Placeholder for vote verification logic
    return true;
  }
}

export const voteStorage = new VoteStorage();

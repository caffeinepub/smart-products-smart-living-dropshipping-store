import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../../backend';
import { useAddReview } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface ReviewsSectionProps {
  productId: bigint;
  reviews: Review[];
}

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={interactive ? 22 : 14}
          className={`${
            i < (interactive ? (hovered || rating) : rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-muted-foreground/30'
          } ${interactive ? 'cursor-pointer transition-colors' : ''}`}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate && onRate(i + 1)}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ productId, reviews }: ReviewsSectionProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const addReview = useAddReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }
    try {
      await addReview.mutateAsync({ productId, rating: BigInt(rating), comment });
      setComment('');
      setRating(5);
      toast.success('Review submitted successfully!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review';
      if (msg.includes('Unauthorized')) {
        toast.error('Please log in to submit a review');
      } else {
        toast.error(msg);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-display text-xl font-bold text-foreground">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id.toString()} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {review.reviewerPrincipal.toString().slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Verified Buyer</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Number(review.timestamp) / 1_000_000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <StarRating rating={Number(review.rating)} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Submit review form */}
      <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Your Rating</label>
            <StarRating rating={rating} interactive onRate={setRating} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={addReview.isPending}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {addReview.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </div>
    </div>
  );
}

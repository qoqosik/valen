export interface FloatingHeart {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  color: string;
}

export enum GameState {
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS',
  SAD = 'SAD',
  VIDEO_CALL = 'VIDEO_CALL'
}
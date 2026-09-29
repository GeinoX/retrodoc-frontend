export type FoundStatus =
  | 'awaiting_drop_off'
  | 'at_station'
  | 'owner_may_be_found'
  | 'returned_to_owner'
  | 'unclaimed'
  | 'drop_off_declined'

export type LostStatus =
  | 'searching'
  | 'possible_match'
  | 'awaiting_collection'
  | 'collected'
  | 'closed'
  | 'expired'

export const ACTIVE_FOUND: FoundStatus[] = ['awaiting_drop_off', 'at_station', 'owner_may_be_found']
export const FINISHED_FOUND: FoundStatus[] = ['returned_to_owner', 'unclaimed', 'drop_off_declined']
export const ACTIVE_LOST: LostStatus[] = ['searching', 'possible_match', 'awaiting_collection']
export const FINISHED_LOST: LostStatus[] = ['collected', 'closed', 'expired']

// Shown under "Needs your attention" on the Overview
export const NEEDS_ATTENTION: LostStatus[] = ['possible_match']

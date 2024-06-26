import { SocketUser } from '@modules/ws/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useCurrentStreamInfoStore = create(
  combine(
    {
      id: '',
      streamer: null as (SocketUser & { followerCount: number; subscribed: boolean }) | null,
      viewerCount: 0,
      active: false,
      ended: false,
    },
    (set) => ({
      setId: (id: string) => set(() => ({ id })),
      setViewerCount: (c: number) => set(() => ({ viewerCount: c })),
      setStreamer: (s: SocketUser & { followerCount: number; subscribed: boolean }) =>
        set(() => ({ streamer: s })),
      setActive: (a: boolean) => set(() => ({ active: a })),
      setEnded: (e: boolean) => set(() => ({ ended: e })),
      reset: () =>
        set(() => ({
          id: '',
          streamer: null,
          viewerCount: 0,
          active: false,
          ended: false,
        })),
    })
  )
);

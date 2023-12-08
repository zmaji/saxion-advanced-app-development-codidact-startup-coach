import type { Module } from './Module';

export interface Roadmap {
  roadmapID: string,
  modules: Module[],
  title: string,
  description: string
}

// src/app/local-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  // Méthode pour obtenir un nombre à partir du localStorage
  getNumber(key: string): number | null {
    const value = localStorage.getItem(key);
    return value !== null ? Number(value) : null;
  }
}

import { Injectable } from '@angular/core';

/**
 * Service for accessing shared assets across the application
 * This provides a centralized way to reference assets and makes it 
 * easier to update paths if the structure changes
 */
@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly baseAssetsPath = 'assets';
  private readonly sharedAssetsPath = 'assets/shared';
  
  // Icons
  private readonly iconsPath = `${this.sharedAssetsPath}/icons`;
  
  // Images
  private readonly imagesPath = `${this.sharedAssetsPath}/images`;

  /**
   * Get the path to the app logo
   */
  getLogoPath(): string {
    return `${this.iconsPath}/budget-icon.png`;
  }

  /**
   * Get the path to the user avatar placeholder
   */
  getUserAvatarPath(): string {
    return `${this.iconsPath}/user-avatar.svg`;
  }

  /**
   * Get the path to a category icon by name
   * @param category The category name (housing, transportation, food, etc.)
   */
  getCategoryIconPath(category: string): string {
    return `${this.iconsPath}/${category.toLowerCase()}.svg`;
  }

  /**
   * Get the full asset path
   * @param relativePath The relative path within the assets directory
   */
  getAssetPath(relativePath: string): string {
    return `${this.baseAssetsPath}/${relativePath}`;
  }

  /**
   * Get path to navigation icons
   * @param iconName The name of the icon (home, reports, settings, etc.)
   */
  getNavIconPath(iconName: string): string {
    return `${this.iconsPath}/${iconName}-icon.png`;
  }

  /**
   * Get all available category icons
   */
  getAvailableCategoryIcons(): { name: string; path: string }[] {
    return [
      { name: 'Housing', path: this.getCategoryIconPath('housing') },
      { name: 'Transportation', path: this.getCategoryIconPath('transportation') },
      { name: 'Food', path: this.getCategoryIconPath('food') }
    ];
  }

  /**
   * Get all available navigation items with icons
   */
  getNavigationItems(): { name: string; path: string; route: string }[] {
    return [
      { name: 'Home', path: this.getNavIconPath('home'), route: '/' },
      { name: 'Summary', path: this.getNavIconPath('summary'), route: '/summary' },
      { name: 'Expenses', path: this.getNavIconPath('expenses'), route: '/expenses' },
      { name: 'Reports', path: this.getNavIconPath('reports'), route: '/reports' },
      { name: 'Settings', path: this.getNavIconPath('settings'), route: '/settings' },
      { name: 'Assistance', path: this.getNavIconPath('assistance'), route: '/assistance' }
    ];
  }

  /**
   * Get top bar icon path
   */
  getTopBarPath(): string {
    return `${this.iconsPath}/Top Bar.png`;
  }

  /**
   * Get hamburger menu icon path
   */
  getHamburgerIconPath(): string {
    return `${this.iconsPath}/hamburger.png`;
  }

  /**
   * Get close button icon path
   */
  getCloseButtonPath(): string {
    return `${this.iconsPath}/close-btn.png`;
  }

  /**
   * Get receive cash icon path
   */
  getReceiveCashIconPath(): string {
    return `${this.iconsPath}/recieve-cash.png`;
  }
} 
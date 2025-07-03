// Filter ads by search term in title or category (case-insensitive, partial match)
export function filterAdsBySearch(ads, term) {
  if (!Array.isArray(ads) || !term) return [];
  const lower = term.toLowerCase();
  return ads.filter(ad => {
    const title = (ad.title || ad.product_name || '').toLowerCase();
    const category = (ad.category || '').toLowerCase();
    return title.includes(lower) || category.includes(lower);
  });
} 
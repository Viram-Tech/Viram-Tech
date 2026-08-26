/**
 * Every Material Symbol ligature rendered anywhere on the site.
 *
 * Google Fonts serves the FULL variable icon font (1.1 MB) unless the request
 * names the icons it needs; passing `icon_names` subsets it to ~20 KB. That
 * means this list must stay in sync — an icon used in JSX but missing here
 * renders as its raw ligature text ("arrow_forward") instead of a glyph.
 *
 * To regenerate after adding icons, scan the built output and the source for
 * ligature children of `.material-symbols-outlined` spans.
 */
export const MATERIAL_SYMBOLS = [
  "account_balance",
  "ads_click",
  "apartment",
  "arrow_back",
  "arrow_downward",
  "arrow_forward",
  "auto_awesome",
  "bolt",
  "call",
  "campaign",
  "cell_tower",
  "chat",
  "check",
  "check_circle",
  "cloud",
  "cloud_sync",
  "description",
  "device_hub",
  "factory",
  "forum",
  "gavel",
  "groups",
  "handyman",
  "headset_mic",
  "hub",
  "insights",
  "inventory_2",
  "lan",
  "language",
  "local_shipping",
  "location_on",
  "lock",
  "medical_services",
  "newspaper",
  "oil_barrel",
  "payments",
  "precision_manufacturing",
  "public",
  "query_stats",
  "router",
  "satellite_alt",
  "schedule",
  "shield",
  "shopping_cart",
  "smart_toy",
  "storefront",
  "timer",
  "trending_up",
] as const;

/** Subsetted, self-describing stylesheet URL for the icons above. */
export const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" +
  `&icon_names=${MATERIAL_SYMBOLS.join(",")}` +
  "&display=block";

# ⚽ World Cup 2026 — iOS Widget + Day Browser

A live-updating **Scriptable widget** for the 2026 FIFA World Cup. See today's scores and kickoff times right on your iPhone Home Screen, and tap to open a full interactive day browser with swipe navigation.

**Works anywhere in the world** — all 104 games automatically display in your local timezone.

---

## ✨ Features

- 🏠 **Home Screen widget** — Small, Medium, and Large sizes supported
- ⚡ **Live scores** fetched from ESPN, refreshed every 5 minutes
- 🌍 **Timezone-aware** — kickoff times shown in your device's local time, automatically
- 📅 **Full schedule** — all 104 matches from Group Stage through the Final
- 🏳️ **Country flags** on every team
- 🇺🇸 **USA games highlighted** in gold so you never miss them
- 📱 **Tap to browse** — opens a full day-by-day browser with swipe navigation
- 🎨 **Stadium Floodlight theme** — black background, electric blue accents

---

## 📸 Preview
<img width="966" height="675" alt="image" src="https://github.com/user-attachments/assets/e559847a-c75b-4afb-8c25-a83ca7aa32e2" />

---

## 🚀 Installation

> **You'll need the free [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) app** — grab it from the App Store first. It takes about 2 minutes total.

### Step 1 — Get the script

Download `WorldCup2026.js` from this repo, or copy the raw file contents.

### Step 2 — Add it to Scriptable

1. Open **Scriptable** on your iPhone
2. Tap **+** in the top-right corner to create a new script
3. Paste the entire contents of `WorldCup2026.js`
4. Tap **Done** (or the ✓ button)
5. Rename the script **WorldCup2026** by tapping the script name at the top

### Step 3 — Test it

Tap the **▶ Play** button — the day browser should open with today's matches and live scores. If it opens, you're good to go.

### Step 4 — Add to your Home Screen

1. **Long-press** your Home Screen until icons jiggle
2. Tap **+** in the top-left corner
3. Search for **Scriptable**
4. Choose a widget size:
   - **Small** — shows 2 games
   - **Medium** — shows 4 games *(recommended)*
   - **Large** — shows 8 games
5. Tap **Add Widget**
6. Long-press the new widget → **Edit Widget**
7. Tap **Script** and select **WorldCup2026**
8. Tap anywhere to save

That's it! 🎉

---

## 📖 How to Use

### Home Screen Widget
- Shows **today's games** with live scores, kickoff times, and flags
- **White score** = match finished
- **Blue score** = match currently live
- **Blue time** = upcoming kickoff
- Tapping the widget opens the full day browser

### Day Browser
- **Swipe left/right** to navigate between match days
- **‹ ›** arrow buttons also work
- Past matches show scores (pulled live from ESPN)
- Upcoming matches show local kickoff times
- USA games highlighted in gold 🇺🇸

---

## 🔧 How It Works

| Feature | Details |
|---|---|
| **Schedule data** | All 104 matches stored as UTC timestamps |
| **Local times** | Converted to your device timezone automatically via `Date` API |
| **Live scores** | Fetched from ESPN's public API on each widget refresh |
| **Score matching** | Team names normalized to handle ESPN naming variations |
| **Widget refresh** | Every 5 minutes (iOS may delay slightly based on battery) |

---

## 🌐 Timezone Support

This widget works correctly **anywhere in the world**. Games are stored in UTC and converted to local time on your device — no configuration needed.

| City | Mexico vs South Africa (19:00 UTC) |
|---|---|
| New York 🇺🇸 | 3:00 PM |
| Los Angeles 🇺🇸 | 12:00 PM |
| London 🇬🇧 | 8:00 PM |
| Paris 🇫🇷 | 9:00 PM |
| Tokyo 🇯🇵 | 4:00 AM (+1 day) |
| Sydney 🇦🇺 | 5:00 AM (+1 day) |

---

## 📋 Requirements

- iPhone running **iOS 14** or later
- [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) (free on the App Store)
- An internet connection for live scores

---

## ❓ Troubleshooting

**Scores aren't showing**
> The widget fetches scores from ESPN's public API. If scores are missing, check your internet connection. The schedule and times always display even without a connection.

**Times look wrong**
> Times are shown in your device's timezone. If they look off, check that your iPhone's timezone is set correctly in **Settings → General → Date & Time**.

**Widget shows "No upcoming matches"**
> This appears on days with no scheduled games (rest days in the knockout rounds). It'll automatically show the next match day.

**The widget isn't updating**
> iOS controls when widgets refresh in the background. The widget requests an update every 5 minutes, but iOS may delay this based on battery and usage patterns. Opening the widget (tapping it) always fetches fresh data.

---

## 📅 Tournament Schedule

| Round | Dates |
|---|---|
| 🏟️ Group Stage | June 11 – June 27 |
| ⚔️ Round of 32 | June 28 – July 3 |
| 🔥 Round of 16 | July 4 – July 7 |
| 💥 Quarterfinals | July 9 – July 12 |
| 🌟 Semifinals | July 14 – July 15 |
| 🥉 Third Place | July 18 |
| 🏆 **Final** | **July 19** |

---

## 🤝 Contributing

Found a bug or want to improve something? PRs welcome! Common areas to improve:

- Score data source (if ESPN API changes)
- Additional widget sizes or layouts
- Lock screen widget support
- Notification support for USA games

---

## 📄 License

MIT License — use it, share it, remix it. Credit appreciated but not required.

---

*Built with [Scriptable](https://scriptable.app) · Scores via [ESPN](https://www.espn.com) · Made for the 2026 FIFA World Cup 🏆*

# 🏨 Hotel Search Feature — Frontend & Backend Reference
<img width="952" height="515" alt="image" src="https://github.com/user-attachments/assets/d7d99657-be1f-4b3e-a09f-47d1d7d0b9b0" />

This document explains the complete flow of how **hotel filtering and search** works across the **React frontend** and **Express + MongoDB backend**.
<img width="1747" height="840" alt="Screenshot 2026-03-27 213926" src="https://github.com/user-attachments/assets/726e78bc-92f8-4dbe-8538-332219dbbf07" />

---

## 📘 Overview

Users can search for hotels and apply filters such as:

- Destination (city or country)
- Star rating ⭐
- Hotel type 🏠
- Facilities 🛁
- Guests 👨‍👩‍👧‍👦
- Price 💰
- Pagination & sorting

When filters are applied, the frontend sends parameters to the backend, which constructs a MongoDB query dynamically and returns the filtered hotels.

---

## ⚙️ Backend Setup (Express + MongoDB)

### Route setup

```ts
app.use("/api/hotels", hotelRoutes);

🔁 Visual Summary
User checks "5 Stars"
   ↓
selectedStars = ["5"]
   ↓
React Query triggers refetch → /api/hotels/search?stars=5
   ↓
Express route receives request
   ↓
constructSearchQuery builds { starRating: { $in: [5] } }
   ↓
MongoDB finds hotels matching 5 stars
   ↓
Backend sends JSON { data: [...hotels], pagination: {...} }
   ↓
Frontend renders new list of hotels

🗂️ Key File References
| File                                           | Description                            |
| ---------------------------------------------- | -------------------------------------- |
| `frontend/src/pages/Search.tsx`                | Manages filters, sends API calls       |
| `frontend/src/components/StarRatingFilter.tsx` | Handles star selection UI              |
| `backend/src/routes/hotels.ts`                 | Express route for `/api/hotels/search` |
| `backend/src/utils/constructSearchQuery.ts`    | Builds MongoDB query                   |
```

💡 Quick Notes

-Always use parseInt() for numeric query params.

-Always use $in for filters that allow multiple options (stars, types, facilities).

-Using Array.isArray() ensures backend supports multiple query values.

-React Query automatically refetches when filters change.

## Nodejs Test Task

### Starting the Server:

1. Install the dependencies:

   ```bash
   npm ci
   ```
2. Create `.env` file in root folder based on `.env.example`

3. Run Docker desktop app.

4. Start the database by running:

   ```bash
   npm run postgres
   ```

5. Start the server by running:

   ```bash
   npm run dev
   ```

### API Routes

1. **Get All Invocations**

   - **URL:** `GET /`
   - **Optional Params:**
     - `startDate` (optional): Filter invocations created after this date.
     - `endDate` (optional): Filter invocations created before this date.
   - **Description:** Retrieves all invocations, optionally filtered by start and end dates.

2. **Get Invocation by ID**

   - **URL:** `GET /:id`
   - **Required Params:**
     - `id`: The ID of the invocation to retrieve.
   - **Description:** Retrieves a specific invocation by its ID.

3. **Cancel All In-Progress Invocations**

   - **URL:** `PATCH /`
   - **Required Params:** None
   - **Description:** Cancels all invocations that are currently in progress.

4. **Complete Invocation**

   - **URL:** `PATCH /compl/:id`
   - **Required Params:**
     - `id`: The ID of the invocation to complete.
   - **Description:** Marks a specific invocation as complete and updates it with a solution.

5. **Cancel Invocation**

   - **URL:** `PATCH /cancel/:id`
   - **Required Params:**
     - `id`: The ID of the invocation to cancel.
     - `cancel`: Reason for cancellation (included in the request body).
   - **Description:** Cancels a specific invocation and records the reason for cancellation.

6. **Set Invocation Status**

   - **URL:** `PATCH /:id`
   - **Required Params:**
     - `id`: The ID of the invocation to update.
     - `status`: The new status to set (NEW, IN_PROGRESS, COMPLETE, CANCELLED).
   - **Description:** Updates the status of a specific invocation.

7. **Create Invocation**
   - **URL:** `POST /`
   - **Required Params:**
     - `text`: The text of the invocation (included in the request body).
     - `theme`: The theme of the invocation (included in the request body).
   - **Description:** Creates a new invocation with the provided text and theme.

### Example Usage

- **Get All Invocations:**

  ```http
  GET /
  Body: { "startDate": "12.02.2025" }
  Body: { "startDate": "12.02.2025",  "endDate":"20.02.2025"}
  ```

- **Get Invocation by ID:**

  ```http
  GET /123
  ```

- **Cancel All In-Progress Invocations:**

  ```http
  PATCH /
  ```

- **Complete Invocation:**

  ```http
  PATCH /compl/123
  Body: { "solution": "Solution details here" }
  ```

- **Cancel Invocation:**

  ```http
  PATCH /cancel/123
  Body: { "cancel": "User request" }
  ```

- **Set Invocation Status:**

  ```http
  PATCH /123
  Body: { "status": "NEW" }
  ```

- **Create Invocation:**
  ```http
  POST /
  Body: { "text": "Invocation text", "theme": "Invocation theme" }
  ```

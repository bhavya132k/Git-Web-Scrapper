# Generating a GitHub Token

To generate a GitHub token, follow these steps:

0. **Create a `.env` file**
    - Create a `.env` file in the backend folder 
    - file path : `backend/.env`
1.  **Log in to GitHub:**
    - Go to [GitHub](https://github.com) and log in to your account.

2. **Navigate to Settings:**
    - Click on your profile picture in the upper-right corner.
    - Select `Settings` from the dropdown menu.

3. **Access Developer Settings:**
    - In the left sidebar, scroll down and click on `Developer settings`.

4. **Personal Access Tokens:**
    - Click on `Personal access tokens`.
    - Click on `Tokens(classic)`
    - Click on `Generate new token`.
    

5. **Configure Token:**
    - Give your token a descriptive name.
    - Create a `.env` file in the backend folder 
    - file path : `backend/.env`
   

6. **Generate Token:**
    - Click on `Generate token`.
    - Now copy the token and place it in the `.env` file created above.
    -  contents of github token are placed after the `GITHUB_API_TOKEN=<your_token>` 
    - The file should look something like below.
        ```
        GITHUB_API_TOKEN=ghp_XXXXXXXXXXXXX
        ```

**Note:** Treat your tokens like passwords. Do not share them or expose them in your code. ( That's why `.env` file should never be committed to github.)

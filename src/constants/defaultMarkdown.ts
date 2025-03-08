export const DEFAULT_MARKDOWN = `#   Title Header (H1 header)


### Introduction (H3 header)

This is some placeholder text to show examples of Markdown formatting.
We have [a full article template](https://github.com/do-community/do-article-templates) you can use when writing a DigitalOcean article.
Please refer to our style and formatting guidelines for more detailed explanations: <https://do.co/style>


## Prerequisites (H2 header)

Before you begin this guide you'll need the following:

- Familiarity with [Markdown](https://daringfireball.net/projects/markdown/)


## Step 1 — Basic Markdown

This is _italics_, this is **bold**, this is __underline__, and this is ~~strikethrough~~.

- This is a list item.
- This list is unordered.

1. This is a list item.
2. This list is ordered.

> This is a quote.
>
> > This is a quote inside a quote.
>
> - This is a list in a quote.
> - Another item in the quote list.

Here's how to include an image with alt text and a title:



![Alt text for screen readers](https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&w=600)

Use horizontal rules to break up long sections:

---

Rich transformations are also applied:

- On ellipsis: ...
- On quote pairs: "sammy", 'test'
- On dangling single quotes: it's
- On en/em dashes: a -- b, a --- b

<!-- Comments will be removed from the output -->

| Tables | are   | also  | supported | and    | will   | overflow | cleanly | if     | needed |
|--------|-------|-------|-----------|--------|--------|----------|---------|--------|--------|
| col 1  | col 2 | col 3 | col 4     | col 5  | col 6  | col 7    | col 8   | col 9  | col 10 |
| col 1  | col 2 | col 3 | col 4     | col 5  | col 6  | col 7    | col 8   | col 9  | col 10 |
| col 1  | col 2 | col 3 | col 4     | col 5  | col 6  | col 7    | col 8   | col 9  | col 10 |
| col 1  | col 2 | col 3 | col 4     | col 5  | col 6  | col 7    | col 8   | col 9  | col 10 |
| col 1  | col 2 | col 3 | col 4     | col 5  | col 6  | col 7    | col 8   | col 9  | col 10 |


## Step 2 — Code


\`\`\`nginx
[label /etc/nginx/sites-available/default]
server {
    listen 80 <^>default_server<^>;
    . . .
}
\`\`\`



\`\`\`line_numbers,js
const test = 'hello';
const other = 'world 🚀';
console.log(test, other);
\`\`\`

\`\`\`line_numbers,js
// Utility function to simulate async operation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to process a list of users and format output
const processUsers = async (users) => {
    console.log("Processing users...");

    // Simulate async data fetching
    await delay(1000);

    return users.map((user, index) => ({
        id: index + 1,
        name: user.toUpperCase(),
        role: user.includes("admin") ? "Administrator" : "User",
    }));
};

// Sample user data
const userList = ["alice", "bob", "charlie", "admin_john"];

// Execute function
(async () => {
    const result = await processUsers(userList);
    console.log("Processed Users:", result);
})();
\`\`\`

Here's output from a command with a secondary label:

\`\`\`
[secondary_label Output]
Could not connect to Redis at 127.0.0.1:6379: Connection refused
\`\`\`


This is a non-root user command example:

\`\`\`command
sudo apt-get update
sudo apt-get install python3
\`\`\`


This is a root command example:

\`\`\`super_user
adduser sammy
shutdown
\`\`\`


This is a custom prefix command example:

\`\`\`custom_prefix(mysql>)
FLUSH PRIVILEGES;
SELECT * FROM articles;
\`\`\`




##  Tutorials

Certain features of our Markdown engine are designed specifically for our tutorial content-types.
These may not be enabled in all contexts in the DigitalOcean community, but are enabled by default in the do-markdownit plugin.

[rsvp_button 1234 "Marketo RSVP buttons use the \`rsvp_button\` flag"]

[terminal ubuntu:focal Terminal buttons are behind the \`terminal\` flag]


# Media Sample
## Audio Sample  
![Audio](https://imgs.search.brave.com/HuX6xatrcghkEO-5fYFGwmePtBbSQoW1BI1VGq93VVg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1qUmlNRFZo/TURFdE5UUXdNUzAw/TUdGaExUazJOelV0/WkRFM05XSXlOMk16/TmpWaFhrRXlYa0Zx/Y0djQC5qcGc)  
<audio controls>
  <source src="https://ia803109.us.archive.org/34/items/perfectedsheeranmusicvideo/Perfect-%20ED%20SHEERAN%20%28Music%20Video%29.mp3" type="audio/mpeg">
</audio>

## Video Sample  

<video controls width="700">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>


## Conclusion

Please refer to our [writing guidelines](https://do.co/style) for more detailed explanations on our style and formatting
`; 
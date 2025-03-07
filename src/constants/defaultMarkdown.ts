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

![Alt text for screen readers](https://assets.digitalocean.com/logos/DO_Logo_horizontal_blue.png "DigitalOcean Logo")

_We also support some extra syntax for setting the width, height and alignment of images. You can provide pixels (\`200\`/\`200px\`), or a percentage (\`50%\`), for the width/height. The alignment can be either \`left\` or \`right\`, with images being centered by default. These settings are all optional._

![](https://assets.digitalocean.com/public/mascot.png)

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

This is \`inline code\`. This is a <^>variable<^>. This is an \`in-line code <^>variable<^>\`. You can also have [\`code\` in links](https://www.digitalocean.com).

Here's a configuration file with a label:

\`\`\`nginx
[label /etc/nginx/sites-available/default]
server {
    listen 80 <^>default_server<^>;
    . . .
}
\`\`\`


Examples can have line numbers, and every code block has a 'Copy' button to copy just the code:

\`\`\`line_numbers,js
const test = 'hello';
const other = 'world';
console.log(test, other);
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


## Conclusion

Please refer to our [writing guidelines](https://do.co/style) for more detailed explanations on our style and formatting
`; 
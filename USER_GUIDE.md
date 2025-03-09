# Oh My Links User Guide!

## Quick Overview

**Oh My Links** is a web application that allows you to organize your favorite web links into customizable groups.

**Main features:**
- Creation of themed groups to organize your links
- Addition of links with title, description, and URL
- Quick search across all your links
- Reorganization of groups using drag-and-drop
- Import/Export of data for backup or transfer

The application stores all your data locally in your browser, which means no information is sent to an external server - you maintain complete control over your data.

## Comprehensive Guide

### 1. General Presentation

Oh My Links is a bookmark management web application that allows you to organize your internet links in a user-friendly and visual interface. Unlike traditional browser bookmarks, Oh My Links offers more flexible and customizable organization.

### 2. Application Structure

The application is organized around two main concepts:

- **Groups**: These are thematic collections that can contain multiple links. Each group has a title and can optionally have a logo and a custom color.
  
- **Links**: These are the individual items stored in each group. A link must have a title and URL, and can also have a description and a logo.

### 3. Detailed Features

#### Creating Groups

1. Click on the "Add a group" button in the top bar
2. Enter the group title (required)
3. Optionally add a logo and color to customize the group
4. Confirm to create the group

#### Managing Groups

- **Edit a group**: Click on the edit icon (pencil) in the group header to change its title, logo, or color
- **Delete a group**: Click on the delete icon (trash) in the group header, then confirm the deletion
- **Reorganize groups**: Simply drag and drop groups to change their display order

#### Adding Links

1. Click on the "+" button in a group
2. Enter the link title and URL (required)
3. Optionally add a description and logo
4. Confirm to add the link to the group

#### Managing Links

- **Access a link**: Click on the title or logo of the link to open it in a new tab
- **Edit a link**: Click on the edit icon (pencil) on the link card
- **Delete a link**: Click on the delete icon (trash) on the link card, then confirm

#### Search

The search bar in the header allows you to quickly filter your groups and links:
- Enter a search term to filter groups and links that contain this term
- The search is performed in the titles, URLs, and descriptions of links
- Groups whose title matches the search term will display all their links
- Groups that don't match but contain matching links will only display those specific links

#### Import and Export of Data

The application offers features to save and restore your data:

- **Export your data**:
  1. Click on "Import / Export" in the top bar
  2. Select "Export data"
  3. A JSON file containing all your data will be downloaded

- **Import data**:
  1. Click on "Import / Export" in the top bar
  2. Select "Import data"
  3. Choose a previously exported JSON file
  4. Confirm the import
  5. The page will reload to display the imported data

### 4. Data Storage

All your data (groups and links) are stored locally in the browser using the localStorage mechanism. This has several advantages:

- **Privacy**: Your data stays on your device and is not sent to external servers
- **Speed**: Data access is instant with no network delay
- **Simplicity**: No account creation or authentication is required

However, this also implies some limitations:

- Data is specific to the browser and device used
- If browsing data is deleted, your data may be lost
- Storage space is limited (typically a few MB per domain)

This is why the export/import functionality is particularly important for regularly backing up your data or transferring it between devices.

### 5. Usage Tips

- **Organization**: Create thematic groups (Work, Hobbies, Inspiration, etc.) to better structure your links
- **Descriptions**: Use descriptions to add contextual information about your links
- **Regular backups**: Export your data regularly to avoid any loss
- **Customization**: Use colors and logos to make the interface more visual and facilitate navigation
- **Search**: Favor specific keywords in titles to facilitate later searches

### 6. Compatibility

The application works on all modern browsers that support:
- JavaScript ES6+
- LocalStorage API
- HTML5 Drag and Drop API

For an optimal experience, use an up-to-date browser such as Chrome, Firefox, Safari, or Edge. 
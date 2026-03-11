# Global Search Functionality

## Overview
The global search feature allows users to search across all data in the CRM application from a single search box in the header.

## Features

### 🔍 **Comprehensive Search**
- **Projects**: Search by project name or ID
- **Companies**: Search by company name, email, phone, owner, status, priority, or project
- **Real-time Results**: Instant search results as you type (minimum 2 characters)
- **Smart Filtering**: Results are categorized by type (Projects, Companies)

### 🎯 **Search Capabilities**
- **Fuzzy Matching**: Partial text matching across all fields
- **Case Insensitive**: Search works regardless of case
- **Multi-field Search**: Single search term matches multiple fields
- **Project Context**: Companies show their associated project

### 🚀 **User Experience**
- **Keyboard Navigation**: Press `Esc` to clear search
- **Click Outside**: Click anywhere to close search results
- **Loading States**: Visual feedback during data fetching
- **Clear Button**: Easy way to clear search input
- **Responsive Design**: Works on all screen sizes

### 🎨 **Visual Features**
- **Categorized Results**: Results grouped by Projects and Companies
- **Rich Information**: Shows relevant details for each result
- **Status Tags**: Color-coded status and priority indicators
- **Icons**: Visual distinction between different result types
- **Hover Effects**: Interactive feedback on result items

### 🔗 **Navigation Integration**
- **Direct Navigation**: Click results to navigate to relevant pages
- **Project Switching**: Automatically switches to correct project
- **Company Highlighting**: Highlights specific companies in the dashboard
- **State Management**: Maintains search context across navigation

## How to Use

### Basic Search
1. Click on the search box in the header
2. Type at least 2 characters
3. Results appear automatically
4. Click on any result to navigate

### Advanced Features
- **Clear Search**: Click the X button or press Esc
- **Navigate Results**: Use mouse or keyboard navigation
- **View Details**: Hover over results to see more information

## Technical Implementation

### Redux Store Structure
```javascript
globalSearch: {
  searchTerm: string,
  searchResults: {
    projects: [],
    companies: [],
    emails: [],
    whatsapp: []
  },
  allData: {
    projects: [],
    companies: []
  },
  loading: boolean,
  error: string,
  isSearchOpen: boolean
}
```

### Key Components
- **Header Component**: Main search interface
- **SearchResults Component**: Results display
- **GlobalSearchSlice**: Redux state management
- **Search Queries**: GraphQL data fetching

### Search Logic
- Fetches all projects and companies on app load
- Performs client-side filtering for instant results
- Supports partial matching across multiple fields
- Maintains search state across navigation

## Searchable Fields

### Projects
- Project Name
- Project ID

### Companies
- Company Name
- Email Address
- Phone Number
- Company Owner
- Status (Active, Inactive, Pending)
- Priority (High, Medium, Low)
- Associated Project

## Future Enhancements

### Planned Features
- **Email Campaign Search**: Search through email templates and campaigns
- **WhatsApp Campaign Search**: Search through WhatsApp campaigns
- **Advanced Filters**: Filter by date, status, priority
- **Search History**: Remember recent searches
- **Export Results**: Export search results to Excel
- **Saved Searches**: Save frequently used search queries

### Technical Improvements
- **Server-side Search**: Move to backend for better performance
- **Full-text Search**: Implement proper text indexing
- **Search Analytics**: Track popular search terms
- **Auto-complete**: Suggest search terms as you type

## Styling

### CSS Classes
- `.search-results-container`: Main results container
- `.search-result-item`: Individual result items
- `.project-item`: Project-specific styling
- `.company-item`: Company-specific styling
- `.highlighted-row`: Dashboard row highlighting

### Responsive Design
- Mobile-optimized search interface
- Collapsible results on small screens
- Touch-friendly interaction areas

## Performance Considerations

### Optimization
- **Debounced Search**: Prevents excessive API calls
- **Cached Data**: Stores search data in Redux
- **Lazy Loading**: Loads data only when needed
- **Efficient Filtering**: Client-side filtering for speed

### Memory Management
- **Cleanup**: Removes event listeners properly
- **State Reset**: Clears search state on navigation
- **Data Limits**: Caps result sets to prevent memory issues

## Troubleshooting

### Common Issues
1. **No Results**: Check if data is loaded in Redux store
2. **Search Not Working**: Verify GraphQL queries are functioning
3. **Navigation Issues**: Check route configuration
4. **Styling Problems**: Ensure CSS files are imported

### Debug Tips
- Check Redux DevTools for state changes
- Monitor network requests for data fetching
- Verify component props and state
- Test on different screen sizes 
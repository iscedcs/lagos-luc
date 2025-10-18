# Zone Integration Documentation

This document outlines the integration of zone management functionality in the Lagos LUC project.

## Overview

The zone management system allows for the creation, retrieval, updating, and deletion of zones within the application. Each zone represents a geographical area with specific tax rates and property value characteristics.

## API Endpoints

### Base URL
```
https://pre-release-land-biller-4n9mh.ondigitalocean.app
```

### Endpoints

1. **Create Zone**
   - `POST /api/zone/create`
   - Creates a new zone
   - Request Body:
     ```json
     {
       "zoneName": "Zone B",
       "zoneType": "PREMIUM",
       "residentialRate": 0.15,
       "commercialRate": 0.21,
       "industrialRate": 0.22,
       "status": "ACTIVE",
       "taxRate": 0.075,
       "avgPropertyValue": 3000000
     }
     ```
   - Response (201):
     ```json
     {
       "success": true,
       "message": "Zone created successfully",
       "data": {
         "id": "uuid",
         "zoneName": "ZONE B",
         // ... other zone properties
       }
     }
     ```

2. **Get All Zones**
   - `GET /api/zone/all`
   - Query Parameters:
     - `limit` (number, default: 10): Number of zones per page
     - `offset` (number, default: 0): Number of zones to skip
   - Response (200):
     ```json
     {
       "success": true,
       "message": "Fetched zones successfully",
       "data": {
         "zones": [...],
         "count": 2,
         "pagination": {
           "limit": 10,
           "offset": 0
         }
       }
     }
     ```

3. **Search Zones**
   - `GET /api/zone/search`
   - Query Parameters:
     - `query` (string, required): Search term
   - Response (200):
     ```json
     {
       "success": true,
       "message": "Zones retrieved successfully",
       "data": [...]
     }
     ```

4. **Get Zone by ID**
   - `GET /api/zone/one/{id}`
   - Response (200):
     ```json
     {
       "success": true,
       "message": "zone retrieved successfully.",
       "data": {...}
     }
     ```

5. **Update Zone**
   - `PATCH /api/zone/update/{id}`
   - Request Body: Partial zone object with fields to update
   - Response (200):
     ```json
     {
       "success": true,
       "message": "Zone updated successfully.",
       "data": {...}
     }
     ```

6. **Get Zone Statistics**
   - `GET /api/zone/stats`
   - Response (200):
     ```json
     {
       "success": true,
       "message": "Zone statistics retrieved successfully",
       "data": {
         "totalZones": 2,
         "zoneTypeBreakdown": {...},
         "locationClassBreakdown": {...}
       }
     }
     ```

7. **Delete Zone**
   - `PATCH /api/zone/delete/{id}`
   - Performs a soft delete of the specified zone
   - Response (200):
     ```json
     {
       "success": true,
       "message": "Zone soft-deleted successfully",
       "data": {...}
     }
     ```

## Integration Steps

1. Create server actions file:
   - Create `actions/zone.ts`
   - Implement server actions for all zone operations
   - Handle errors appropriately
   - Return error responses instead of throwing errors

2. Update API Routes:
   - Add zone URLs to `API_ROUTE` object in constants file
   - Use axios client configuration for API calls

3. Usage in Components:
   - Import server actions from `actions/zone.ts`
   - Use the actions in your components
   - Handle responses appropriately
   - Show success/error messages using toast notifications
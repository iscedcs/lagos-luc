// Generate random coordinates within Lagos area
const generateRandomCoordinate = (center: { lat: number; lng: number }, radiusKm: number) => {
  // Earth's radius in kilometers
  const earthRadius = 6371

  // Convert radius from kilometers to radians
  const radiusInRadian = radiusKm / earthRadius

  // Random angle
  const randomAngle = Math.random() * Math.PI * 2

  // Random distance within radius
  const randomDistance = Math.random() * radiusInRadian

  // Convert center to radians
  const centerLatRad = (center.lat * Math.PI) / 180
  const centerLngRad = (center.lng * Math.PI) / 180

  // Calculate new position
  const newLatRad = Math.asin(
    Math.sin(centerLatRad) * Math.cos(randomDistance) +
      Math.cos(centerLatRad) * Math.sin(randomDistance) * Math.cos(randomAngle),
  )

  const newLngRad =
    centerLngRad +
    Math.atan2(
      Math.sin(randomAngle) * Math.sin(randomDistance) * Math.cos(centerLatRad),
      Math.cos(randomDistance) - Math.sin(centerLatRad) * Math.sin(newLatRad),
    )

  // Convert back to degrees
  const newLat = (newLatRad * 180) / Math.PI
  const newLng = (newLngRad * 180) / Math.PI

  return { lat: newLat, lng: newLng }
}

// Generate mock properties data
export const generateMockProperties = (count: number) => {
  const propertyTypes = ["Land", "Building", "Mixed-use"]
  const propertyUses = ["Residential", "Commercial", "Industrial", "Government"]
  const zones = [
    { name: "Lagos Island", center: { lat: 6.455, lng: 3.3841 }, radius: 3 },
    { name: "Ikeja", center: { lat: 6.6018, lng: 3.3515 }, radius: 3 },
    { name: "Lekki", center: { lat: 6.4698, lng: 3.5852 }, radius: 5 },
    { name: "Surulere", center: { lat: 6.5059, lng: 3.3565 }, radius: 3 },
    { name: "Ikorodu", center: { lat: 6.6194, lng: 3.5105 }, radius: 4 },
    { name: "Badagry", center: { lat: 6.4315, lng: 2.8876 }, radius: 5 },
  ]
  const complianceStatuses = ["compliant", "defaulting", "partial"]

  return Array.from({ length: count }, (_, i) => {
    const zoneIndex = Math.floor(Math.random() * zones.length)
    const zone = zones[zoneIndex]
    const coordinates = generateRandomCoordinate(zone.center, zone.radius)

    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const use = propertyUses[Math.floor(Math.random() * propertyUses.length)]
    const complianceStatus = complianceStatuses[Math.floor(Math.random() * complianceStatuses.length)]

    // Generate a random property value between 10M and 500M
    const value = Math.floor(Math.random() * 490000000) + 10000000
    const luc = Math.floor(value * 0.005) // 0.5% of property value

    return {
      id: `id-${i + 1}`,
      propertyId: `LGS-${100000 + i}`,
      address: `${Math.floor(Math.random() * 200) + 1} ${zone.name} Road, Lagos`,
      coordinates,
      zone: zone.name,
      type,
      use,
      ownerName: ["John Doe", "Jane Smith", "David Adeyemi", "Sarah Johnson", "Michael Chen"][
        Math.floor(Math.random() * 5)
      ],
      complianceStatus,
      registrationDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
        .toISOString()
        .split("T")[0],
      value,
      luc,
      paymentStatus: complianceStatus === "compliant" ? "paid" : complianceStatus === "partial" ? "partial" : "unpaid",
      // Valuation parameters
      locationClass: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
      locationWeight: [1.5, 1.2, 1.0, 0.8][Math.floor(Math.random() * 4)],
      useWeight: type === "Commercial" ? 1.0 : type === "Industrial" ? 0.8 : 0.5,
      typeWeight: type === "Building" ? 1.2 : type === "Mixed-use" ? 1.3 : 1.0,
      buildingFactor: type !== "Land" ? [1.2, 1.0, 0.8][Math.floor(Math.random() * 3)] : 1.0,
      areaFactor: [1.5, 1.2, 1.0, 0.8][Math.floor(Math.random() * 4)],
    }
  })
}


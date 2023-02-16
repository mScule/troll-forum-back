function exclude(data: Record<string, any>, keys: string[]) {
  const excludedData = {...data}

  for(const key of keys) {
    if (excludedData[key]) {
      delete excludedData[key]
    }
  }

  return excludedData;
}

export default exclude;

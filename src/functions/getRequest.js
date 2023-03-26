export const handleRespons = (prevState, newPage, thisState) => {
  let newState = { ...prevState };
  newState.searchFilter = thisState.searchFilter;
  newState.pages = thisState.pages;
  newState.hideButton = false;
  if (newState.pages === 1) {
    newState.photos = newPage;
    return newState;
  }
  if (newPage.length === 0) {
    newState.loading = false;
    newState.hideButton = true;
    return newState;
  }
  newState.photos = [...prevState.photos, ...newPage];
  if (newState.photos.length % 12 !== 0) {
    newState.hideButton = true;
  }
  return newState;
};

const clothesStore = [];

class MockClothingItem {
  constructor(data) {
    this._id = "item-" + Date.now() + Math.random().toString(36).substr(2, 5);
    this.id = this._id;
    this.userId = data.userId;
    this.imageUrl = data.imageUrl;
    this.category = data.category || { main: "top", sub: "other" };
    this.color = data.color || ["unknown"];
    this.style = data.style || [];
    this.season = data.season || [];
    this.embedding = data.embedding || [];
    // Ensure o.top._doc structure works in outfit generation
    this._doc = this;
  }

  async save() {
    const index = clothesStore.findIndex(item => item._id === this._id);
    if (index !== -1) {
      // Retain existing fields and overlay updates
      Object.assign(clothesStore[index], this);
      return clothesStore[index];
    } else {
      clothesStore.push(this);
      return this;
    }
  }

  static async find(query) {
    let result = clothesStore;
    if (query && query.userId) {
      result = result.filter(item => item.userId === query.userId);
    }
    return result;
  }

  static async findOne(query) {
    const found = clothesStore.find(item => {
      let match = true;
      if (query._id && item._id !== query._id) match = false;
      if (query.userId && item.userId !== query.userId) match = false;
      return match;
    });
    return found || null;
  }

  static async deleteOne(query) {
    const index = clothesStore.findIndex(item => item._id === query._id);
    if (index !== -1) {
      clothesStore.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }
}

module.exports = MockClothingItem;

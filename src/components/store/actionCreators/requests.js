import * as actions from "../actions";
import { message } from "antd";
import axios from "axios";

export const loadAction = () => {
  return {
    type: actions.LOADER_ACTION,
  };
};

export const stopLoader = () => {
  return {
    type: actions.STOP_LOADER,
  };
};

export const setBoards = (data) => {
  return {
    type: actions.SET_BOARDS,
    data,
  };
};

export const setLists = (data) => {
  return {
    type: actions.SET_LISTS,
    data,
  };
};

export const setNewLists = (data) => {
  return {
    type: actions.SET_NEW_LISTS,
    data: data,
  };
};

export const setMilestoneLists = (data) => {
  return {
    type: actions.SET_MILESTONE_LISTS,
    data,
  };
};

export const setCanvasLists = (data) => {
  return {
    type: actions.SET_CANVAS_LISTS,
    data,
  };
};

export const setCards = (data) => {
  return {
    type: actions.SET_CARDS,
    data,
  };
};

export const setMilestoneCards = (data) => {
  return {
    type: actions.SET_MILESTONE_CARDS,
    data,
  };
};

export const setCanvasCards = (data) => {
  return {
    type: actions.SET_CANVAS_CARDS,
    data,
  };
};

export const setBlogs = (data) => {
  return {
    type: actions.SET_BLOGS,
    data,
  };
};

export const setCanvas = (boardId, boardName) => {
  return {
    type: actions.SET_CANVAS,
    boardId,
    boardName,
  };
};

export const setMilestone = (boardId, boardName) => {
  return {
    type: actions.SET_MILESTONES,
    boardId,
    boardName,
  };
};

export const setAirtableData = (data) => {
  return {
    type: actions.SET_AIRTABLE_DATA,
    data,
  };
};

export const setExpenseData = (data) => {
  return {
    type: actions.SET_EXPENSE_DATA,
    data,
  };
};

export const setValue = (value) => {
  return {
    type: actions.SET_VALUE,
    value,
  };
};

export const setTeamsValue = (value) => {
  return {
    type: actions.SET_TEAMS_VALUE,
    value,
  };
};

export const setVisionValue = (value) => {
  return {
    type: actions.SET_VISION_VALUE,
    value,
  };
};

export const setPropositionValue = (value) => {
  return {
    type: actions.SET_PROPOSITION_VALUE,
    value,
  };
};

export const setProductValue = (value) => {
  return {
    type: actions.SET_PRODUCT_VALUE,
    value,
  };
};

export const setMarketValue = (value) => {
  return {
    type: actions.SET_MARKET_VALUE,
    value,
  };
};

export const setBusinessValue = (value) => {
  return {
    type: actions.SET_BUSINESS_VALUE,
    value,
  };
};

export const setInvestmentValue = (value) => {
  return {
    type: actions.SET_INVESTMENT_VALUE,
    value,
  };
};

export const deleteCardAction = (id) => {
  return {
    type: actions.DELETE_CARD,
    id,
  };
};

export const deleteListAction = (id) => {
  return {
    type: actions.DELETE_LIST,
    id,
  };
};

export const setStatememnts = (data) => {
  return {
    type: actions.SET_STATEMENTS,
    data,
  };
};

export const setObjectives = (data) => {
  return {
    type: actions.SET_OBJECTIVES,
    data,
  };
};

export const dragWithListAction = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  // console.log(droppableIdStart)
  return {
    type: actions.DRAG_WITHIN_LIST,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
  };
};

export const dragCardWithInList = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return (dispatch) => {
    dispatch(
      dragWithListAction(
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId
      )
    );
    // console.log(droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     draggableId)
  };
};

export const cardIndexUpdate = (
  sourceId,
  destinationId,
  sourceList,
  DestList,
  callback
) => {
  return (dispatch, getState) => {
    // dispatch(loadAction())
    let lists = [...getState().requests.lists];

    let sourceCards,
      destinationCards = [];

    if (sourceId === destinationId) {
      sourceCards = [
        ...sourceList.cards.map((l, index) => ({ ...l, cardIndex: index })),
      ];
    }

    if (sourceId !== destinationId) {
      sourceCards = [
        ...sourceList.cards.map((l, index) => ({ ...l, cardIndex: index })),
      ];
      destinationCards = [
        ...DestList.cards.map((l, index) => ({ ...l, cardIndex: index })),
      ];
      // console.log(sourceCards, destinationCards, 'lists')
    }

    axios
      .post(`catalyzer/list/updateIndexes`, {
        sourceId,
        destinationId,
        sourceCards,
        destinationCards,
      })
      .then((res) => {
        // console.log(res.data.lists, 'fsd')
        // dispatch(setLists(res.data.lists))
        callback({ success: true, res: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createAdminCard = (listId, name, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const lists = getState().admin.lists;
    let cardIndex;

    const list = lists.find((l) => l._id === listId);

    if (list.cards.length === 0) cardIndex = 0;
    if (list.cards.length > 0) cardIndex = parseInt(list.cards.length);
    const data = {
      cardIndex,
      name,
      listId,
      description: "",
      dueDate: "",
    };

    axios
      .post(`catalyzer/card`, data)
      .then((res) => {
        // console.log(res)
        dispatch(stopLoader());
        callback({ success: true, res: res });
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const createCard = (listId, name, callback) => {
  return (dispatch, getState) => {
    // dispatch(loadAction())

    const lists = getState().requests.lists;
    let cardIndex;

    const list = lists.find((l) => l._id === listId);

    if (list.cards.length === 0) cardIndex = 0;
    if (list.cards.length > 0) cardIndex = parseInt(list.cards.length);
    const data = {
      cardIndex,
      name,
      listId,
      description: "",
      dueDate: "",
    };

    axios
      .post(`catalyzer/card`, data)
      .then((res) => {
        // console.log(res)
        // dispatch(stopLoader())
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateList = (id, name, callback) => {
  return (dispatch, getState) => {
    const data = {
      name,
    };
    axios
      .put(`catalyzer/list/${id}`, data)
      .then((res) => {
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCard = (id, cardIndex, name, callback) => {
  return (dispatch, getState) => {
    const data = {
      name,
      cardIndex,
    };
    axios
      .put(`catalyzer/card/${id}`, data)
      .then((res) => {
        // console.log(res)
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postBlog = (
  title,
  name,
  imageLink,
  bio,
  category,
  featuredimageLink,
  article,
  callback
) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      title,
      author: { name: name, imageLink: imageLink, bio: bio },
      category,
      featuredimageLink,
      article,
    };

    axios
      .post(`admin/blog`, data)
      .then((res) => {
        // console.log(res);
        dispatch(stopLoader());
        callback({ success: true, res: res });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const postView = (id) => {
  return (dispatch, getState) => {
    const data = {
      views: 0,
    };
    axios
      .put(`admin/blog/${id}`, data)
      .then((res) => {
        // console.log(res);
        // dispatch(setBlogs(res.data.articles));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addLeanCanvas = (name, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      name: name,
    };

    axios
      .post(`catalyzer/create-canvas`, data)
      .then((res) => {
        // console.log(res);
        dispatch(stopLoader());
        callback({ success: true });
        dispatch(setBoards(res.data.boards));
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const getBoards = () => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/boards`)
      .then((res) => {
        dispatch(setBoards(res.data.boards));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getListsOnBoard = () => {
  return (dispatch, getState) => {
    // dispatch(loadAction())

    axios
      .get(`catalyzer/lists`)
      .then((res) => {
        // console.log(res);
        dispatch(setLists(res.data.list));
        dispatch(setCanvasLists(res.data.list));
        dispatch(setMilestoneLists(res.data.list));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getBlogs = () => {
  return (dispatch, getState) => {
    axios
      .get(`admin/blogs`)
      .then((res) => {
        dispatch(setBlogs(res.data.articles));
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCard = (listId, cardIndex, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      cardIndex,
    };

    axios
      .put(`catalyzer/delete/${listId}`, data)
      .then((res) => {
        // console.log(res);
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
        dispatch(stopLoader());
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const archiveCard = (listId, cardIndex, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      cardIndex,
    };

    axios
      .put(`catalyzer/card/archive/${listId}`, data)
      .then((res) => {
        // console.log(res);
        dispatch(setLists(res.data.lists));
        dispatch(stopLoader());
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteBoard = (id, callback) => {
  return (dispatch, getState) => {
    axios
      .delete(`catalyzer/board/${id}`)
      .then((res) => {
        // console.log(res)
        dispatch(setBoards(res.data.boards));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteList = (id, callback) => {
  return (dispatch, getState) => {
    axios
      .delete(`catalyzer/list/${id}`)
      .then((res) => {
        // console.log(res)
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const archiveList = (id, callback) => {
  return (dispatch, getState) => {
    // dispatch(loadAction())

    const data = {
      archive: true,
    };

    axios
      .put(`catalyzer/list/archive/${id}`, data)
      .then((res) => {
        // console.log(res.data.lists, 'll');
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const unarchiveList = (id, callback) => {
  return (dispatch, getState) => {
    // dispatch(loadAction())

    const data = {
      archive: true,
    };

    axios
      .put(`catalyzer/list/restore-list/${id}`, data)
      .then((res) => {
        // console.log(res.data)
        dispatch(setLists(res.data.lists));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const archiveBoard = (id) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      archive: "",
    };

    axios
      .put(`catalyzer/board/archive/${id}`, data)
      .then((res) => {
        dispatch(stopLoader());
        dispatch(setBoards(res.data.boards));
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

export const unarchiveBoard = (id, callback) => {
  return (dispatch, getState) => {
    // dispatch(loadAction())

    const data = {
      archive: true,
    };

    axios
      .put(`catalyzer/board/restore-board/${id}`, data)
      .then((res) => {
        // console.log(res.data)
        dispatch(setBoards(res.data.boards));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addValues = (
  teams,
  vision,
  proposition,
  product,
  market,
  business,
  investment,
  callback
) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      teams,
      vision,
      proposition,
      product,
      market,
      business,
      investment,
    };

    axios
      .post(`catalyzer/value`, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, res: res });
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getValues = () => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/values`)
      .then((res) => {
        // console.log(res);
        dispatch(setValue(res.data.scalevalues));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addStatement = (id, vision, mission, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      vision,
      mission,
    };

    axios
      .post(`catalyzer/statement/${id}`, data)
      .then((res) => {
        // console.log(res.data.statement)
        dispatch(stopLoader());
        dispatch(setStatememnts(res.data.statements));
        callback({ success: true, res: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getStatement = () => {
  return (dispatch, getState) => {
    axios
      .get(`catalyzer/statements`)
      .then((res) => {
        dispatch(setStatememnts(res.data.statements));
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const editStatement = (id, vision, mission, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      vision,
      mission,
    };

    axios
      .put(`catalyzer/statement/${id}`, data)
      .then((res) => {
        dispatch(setStatememnts(res.data.statements));
        callback({ success: true, res: res });
        dispatch(stopLoader());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addItem = (path, data, validate, callback) => {
  if (typeof validate !== "undefined" && !validate(data))
    return message.info("All fields are required");
  return (dispatch) => {
    dispatch(loadAction());
    axios
      .post(path, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const getItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loadAction());
    axios
      .get(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};

export const searchItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loadAction());
    axios
      .get(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};

export const updateItem = (path, data, validate, callback) => {
  if (typeof validate !== "undefined" && !validate(data))
    return message.info("All fields are required");
  return (dispatch) => {
    dispatch(loadAction());
    axios
      .patch(path, data)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
        // console.log(res);
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false });
        console.log(error);
      });
  };
};

export const deleteItem = (path, callback) => {
  return (dispatch) => {
    dispatch(loadAction());
    axios
      .delete(path)
      .then((res) => {
        dispatch(stopLoader());
        callback({ success: true, data: res.data });
      })
      .catch((error) => {
        dispatch(stopLoader());
        callback({ success: false, error: error });
        console.log(error);
      });
  };
};

export const archiveObjective = (id, callback) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      archive: "",
    };

    axios
      .put(`catalyzer/archive-obj/${id}`, data)
      .then((res) => {
        // console.log(res)
        dispatch(setObjectives(res.data.objs));
        callback({ success: true, res: res });
        dispatch(stopLoader());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateQuarter = (objId) => {
  return (dispatch, getState) => {
    dispatch(loadAction());

    const data = {
      id: "",
    };
    axios
      .put(`catalyzer/update-quarter/${objId}`, data)
      .then((res) => {
        dispatch(setObjectives(res.data.objs));
        dispatch(stopLoader());
      })
      .catch((error) => {
        dispatch(stopLoader());
        console.log(error);
      });
  };
};

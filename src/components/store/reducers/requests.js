import * as actions from "../actions";
import { updateObject } from "./utility";

const initialState = {
  data: [],
  expense: [],
  boards: [],
  values: [],
  users: [],
  statements: [],
  quarter: 0,
  objectives: [],
  notes: [],
  note: {},
  revenue: [],
  teams: 0,
  vision: 0,
  proposition: 0,
  product: 0,
  market: 0,
  business: 0,
  investment: 0,
  on_create_boards: [],
  lists: [],
  all_lists: [],
  canvas_lists: [],
  milestone_lists: [],
  cards: [],
  canvas_cards: [],
  milestone_cards: [],
  blogs: [],
  canvas_board_id: "",
  canvas_board_name: "",
  milestone_board_id: "",
  milestone_board_name: "",
  loading: false,
  droppableIdStart: "",
  droppableIdEnd: "",
  droppableIndexStart: "",
  droppableIndexEnd: "",
  draggableId: "",
};

const requests = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADER_ACTION:
      return updateObject(state, {
        loading: true,
      });

    case actions.STOP_LOADER:
      return updateObject(state, {
        loading: false,
      });

    case actions.SET_AIRTABLE_DATA:
      return updateObject(state, {
        data: action.data,
      });

    case actions.SET_VALUE:
      return updateObject(state, {
        values: action.value,
      });

    case actions.SET_TEAMS_VALUE:
      return updateObject(state, {
        teams: action.value,
      });

    case actions.SET_VISION_VALUE:
      return updateObject(state, {
        vision: action.value,
      });

    case actions.SET_PROPOSITION_VALUE:
      return updateObject(state, {
        proposition: action.value,
      });

    case actions.SET_PRODUCT_VALUE:
      return updateObject(state, {
        product: action.value,
      });

    case actions.SET_MARKET_VALUE:
      return updateObject(state, {
        market: action.value,
      });

    case actions.SET_BUSINESS_VALUE:
      return updateObject(state, {
        business: action.value,
      });

    case actions.SET_INVESTMENT_VALUE:
      return updateObject(state, {
        investment: action.value,
      });

    case actions.SET_EXPENSE_DATA:
      return updateObject(state, {
        expense: action.data,
      });

    case actions.SET_BOARDS:
      return updateObject(state, {
        boards: action.data,
      });

    case actions.SET_LISTS:
      return updateObject(state, {
        lists: action.data,
      });

    case actions.SET_STATEMENTS:
      return updateObject(state, {
        loading: false,
        statements: action.data,
      });

    case actions.SET_OBJECTIVES:
      return updateObject(state, {
        loading: false,
        objectives: action.data,
      });

    case actions.SET_NOTES:
      return updateObject(state, {
        loading: false,
        notes: action.data,
      });

    case actions.SET_NOTE:
      return updateObject(state, {
        loading: false,
        note: action.data,
      });

    case actions.SET_ALL_USERS:
      return updateObject(state, {
        loading: false,
        users: action.data,
      });

    case actions.SET_CURRENT_QUARTER:
      return updateObject(state, {
        loading: false,
        quarter: action.data,
      });

    case actions.SET_REVENUE:
      return updateObject(state, {
        loading: false,
        revenue: action.data,
      });

    case actions.SET_CANVAS_LISTS:
      return updateObject(state, {
        loading: false,
        canvas_lists: action.data,
      });

    case actions.SET_MILESTONE_LISTS:
      return updateObject(state, {
        loading: false,
        milestone_lists: action.data,
      });

    case actions.SET_CARDS:
      return updateObject(state, {
        cards: action.data,
      });

    case actions.SET_CANVAS_CARDS:
      return updateObject(state, {
        canvas_cards: action.data,
      });

    case actions.SET_MILESTONE_CARDS:
      return updateObject(state, {
        milestone_cards: action.data,
      });

    case actions.SET_BLOGS:
      return updateObject(state, {
        blogs: action.data,
      });

    case actions.SET_CANVAS:
      return updateObject(state, {
        canvas_board_id: action.boardId,
        canvas_board_name: action.boardName,
      });

    case actions.SET_MILESTONES:
      return updateObject(state, {
        milestone_board_id: action.boardId,
        milestone_board_name: action.boardName,
      });

    case actions.DELETE_CARD:
      return updateObject(state, {
        loading: false,
        cards: state.cards.filter(({ _id }) => _id !== action.id),
        canvas_cards: state.canvas_cards.filter(({ _id }) => _id !== action.id),
        milestone_cards: state.milestone_cards.filter(
          ({ _id }) => _id !== action.id
        ),
      });

    case actions.DELETE_LIST:
      return updateObject(state, {
        lists: state.lists.filter(({ _id }) => _id !== action.id),
        canvas_lists: state.canvas_lists.filter(({ _id }) => _id !== action.id),
        milestone_lists: state.milestone_lists.filter(
          ({ _id }) => _id !== action.id
        ),
      });

    case actions.DRAG_WITHIN_LIST:
      const {
        droppableIdStart: src,
        droppableIdEnd: dest,
        droppableIndexStart: sIndx,
        droppableIndexEnd: eIndx,
      } = action;

      let lists;

      if (src === dest) {
        let list = { ...state.lists.find((list) => src === list._id) };
        const card = list.cards[sIndx];
        list.cards.splice(sIndx, 1);
        list.cards.splice(eIndx, 0, card);
        const cards = list.cards;
        lists = [
          ...state.lists.map((list) =>
            src === list._id ? { ...list, cards } : list
          ),
        ];
      }

      if (src !== dest) {
        //cards of sourcelist, remove card
        //cards of destlist, add cards
        let stateLists = [...state.lists];
        //const listSource = stateLists.find(list => src === list._id)
        const listSourceIndex = stateLists.findIndex(
          (list) => src === list._id
        );
        const card = stateLists[listSourceIndex].cards[sIndx];
        stateLists[listSourceIndex].cards.splice(sIndx, 1);
        // lists = [...state.lists.map(list => src === list._id ? ({...list, cards: sourceCards}) :list)]
        //const listEnd = stateLists.find(list => dest === list._id)
        const listEndIndex = stateLists.findIndex((list) => dest === list._id);
        stateLists[listEndIndex].cards.splice(eIndx, 0, card);
        // lists = [...state.lists.map(list => dest === list._id ? ({...list, cards: destCards}) :list)]
        // console.log('Lists---', lists)
        lists = stateLists;
      }

      return updateObject(state, {
        lists,
        droppableIdStart: action.droppableIdStart,
        droppableIdEnd: action.droppableIdEnd,
        droppableIndexStart: action.droppableIndexStart,
        droppableIndexEnd: action.droppableIndexEnd,
        draggableId: action.draggableId,
      });

    case actions.SET_NEW_LISTS:
      return updateObject(state, {
        lists: action.data,
      });

    default:
      return state;
  }
};

export default requests;

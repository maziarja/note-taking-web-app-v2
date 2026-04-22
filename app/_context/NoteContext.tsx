"use client";

import initialNotes from "@/data.json";
import { NoteType } from "@/lib/schemas/note";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getDBNotes } from "../_actions/note/getDBNotes";
import { getSession } from "../_actions/auth/getSession";

type NoteContextType = {
  dispatch: React.Dispatch<Action>;
  notes: NoteType[];
  reloadNotes: () => void;
  userAuthenticated: boolean;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const initialState = {
  notes: [],
  userAuthenticated: false,
  // notes: initialNotes.notes,
};

type Action =
  | { type: "set_notes"; payload: NoteType[] }
  | { type: "added_note"; payload: NoteType }
  | { type: "deleted_note"; payload: string }
  | {
      type: "set_archived_note";
      payload: { noteId: string; isArchived: boolean };
    }
  | {
      type: "updated_note_content";
      payload: {
        noteId: string;
        content: string;
        title: string;
        lastEdited: string;
      };
    }
  | { type: "user_authenticated"; payload: boolean }
  | { type: "restore_deleted_note"; payload: NoteType };

type State = {
  notes: NoteType[];
  userAuthenticated: boolean;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "set_notes": {
      return {
        ...state,
        notes: action.payload,
      };
    }
    case "added_note": {
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    }
    case "deleted_note": {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    }

    case "restore_deleted_note": {
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    }

    case "set_archived_note": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, isArchived: action.payload.isArchived }
            : note,
        ),
      };
    }

    case "updated_note_content": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.noteId
            ? {
                ...note,
                content: action.payload.content,
                title: action.payload.title,
                lastEdited: action.payload.lastEdited,
              }
            : note,
        ),
      };
    }

    case "user_authenticated": {
      return {
        ...state,
        userAuthenticated: action.payload,
      };
    }

    default: {
      throw Error("Unknown action");
    }
  }
}

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [{ notes, userAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const [reloadNote, setReloadNote] = useState(0);
  const reloadNotes = () => setReloadNote((v) => v + 1);

  useEffect(() => {
    async function loadNotes() {
      const [loggedInUser, dbNotes] = await Promise.all([
        getSession(),
        getDBNotes(),
      ]);

      if (loggedInUser) {
        if (dbNotes) dispatch({ type: "set_notes", payload: dbNotes });
        dispatch({ type: "user_authenticated", payload: true });
      } else {
        dispatch({ type: "set_notes", payload: initialNotes.notes });
        dispatch({ type: "user_authenticated", payload: false });
      }
    }
    loadNotes();
  }, [reloadNote]);

  return (
    <NoteContext.Provider
      value={{
        dispatch,
        notes,
        reloadNotes,
        userAuthenticated,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNote() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("Note context was used outside of note provider");
  }
  return context;
}

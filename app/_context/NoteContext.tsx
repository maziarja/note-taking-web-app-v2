"use client";

import initialNotes from "@/data.json";
import { NoteType } from "@/lib/schemas/note";
import { createContext, useContext, useReducer } from "react";

type NoteContextType = {
  dispatch: React.Dispatch<Action>;
  notes: NoteType[];
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

const initialState = {
  notes: initialNotes.notes,
};

type Action =
  | { type: "added_note"; payload: NoteType }
  | { type: "deleted_note"; payload: string }
  | { type: "toggled_restore_note"; payload: string }
  | { type: "updated_note_content"; id: string; payload: string };

type State = {
  notes: NoteType[];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
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
    case "toggled_restore_note": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload
            ? { ...note, isArchived: !note.isArchived }
            : note,
        ),
      };
    }

    case "updated_note_content": {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, content: action.payload } : note,
        ),
      };
    }

    default: {
      throw Error("Unknown action");
    }
  }
}

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [{ notes }, dispatch] = useReducer(reducer, initialState);

  return (
    <NoteContext.Provider
      value={{
        dispatch,
        notes,
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

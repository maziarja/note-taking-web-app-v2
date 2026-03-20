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

type Action = { type: "added_note" } | { type: "deleted_note" };

type State = {
  notes: NoteType[];
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "added_note": {
      return state;
    }
    case "deleted_note": {
      return state;
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

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LastEventCard from "./index";

import { DataProvider, useData } from "../../contexts/DataContext";

const mockData = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-02-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

// Mock the useData hook
jest.mock("../../contexts/DataContext", () => ({
  ...jest.requireActual("../../contexts/DataContext"),
  useData: jest.fn(),
}));

describe("LastEventCard", () => {
  it("renders loading message when data is loading", () => {
    // Mock useData hook to return loading state
    useData.mockReturnValue({ loading: true });

    render(
      <DataProvider>
        <LastEventCard />
      </DataProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });


  it("renders loading message when data no found", () => {
    // Mock useData hook to return loading state
    useData.mockReturnValue({ loading: false , data:null});

    render(
      <DataProvider>
        <LastEventCard />
      </DataProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders event card with the latest event when data is available", async () => {
    // Mock useData hook to return data
    useData.mockReturnValue({ data: mockData, loading: false });

    render(
      <DataProvider>
        <LastEventCard />
      </DataProvider>
    );

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getByText("Conférence #productCON")).toBeInTheDocument();
      expect(screen.getByText("boom")).toBeInTheDocument();
    });
  });

});

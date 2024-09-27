import { render, fireEvent } from "@testing-library/react";
import ContractForm from "../components/ContractForm";
import { Contract } from "../types/contract";

describe("ContractForm component", () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockResetForm = jest.fn();

  const formData: Contract = {
    author: "Author",
    entityName: "Entity Name",
    description: "Description",
    createdAt: new Date().toISOString().split("T")[0],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call handleSubmit on form submission", async () => {
    const { getByRole } = render(
      <ContractForm
        formData={formData}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        resetForm={mockResetForm}
        isUpdate={false}
      />
    );

    const submitButton = getByRole("button", { name: /create contract/i });
    await fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(formData);
    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});

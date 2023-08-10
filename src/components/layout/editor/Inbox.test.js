import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Inbox from "./Inbox";

jest.mock('axios');

describe('Inbox Component', () => { 
  
  test('renders without errors', () => {
    render(<Inbox />)
    
  })
 })
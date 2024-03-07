import { z } from 'zod';


const resetPassCode = z.string().min(1, 'Code is required');

export const resetPasswordCodeValidationSchema = z.object({ resetPassCode });

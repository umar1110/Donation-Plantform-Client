"use client";

import { motion } from "framer-motion";
import { Building2, User, ArrowRight } from "lucide-react";
import { SignupType } from "../types";

interface TypeSelectionProps {
  onSelect: (type: SignupType) => void;
}

export function TypeSelection({ onSelect }: TypeSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Create your account
        </h1>
        <p className="text-muted">Choose how you want to get started</p>
      </div>

      <div className="grid gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("organization")}
          className="p-6 rounded-xl border-2 border-border hover:border-primary bg-card text-left transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Organization
              </h3>
              <p className="text-sm text-muted">
                Register your charity or non-profit to create campaigns, manage
                donations, and engage with donors.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors mt-1" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("user")}
          className="p-6 rounded-xl border-2 border-border hover:border-primary bg-card text-left transition-colors group"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
              <User className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Individual Donor
              </h3>
              <p className="text-sm text-muted">
                Join as a donor to discover causes, make donations, and track
                your giving history.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors mt-1" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
